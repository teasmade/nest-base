import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PaginationSession, PaginationResult } from './interfaces';
import { randomUUID } from 'crypto';
@Injectable()
export class OasisPaginationService {
  private readonly PAGINATION_SESSION_TTL_MS = 60 * 60 * 1000;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async handlePagination(
    existingSessionId: string | undefined,
    nextlink: string,
    totalItems?: number,
    direction?: 'next' | 'prev',
  ): Promise<PaginationResult> {
    if (existingSessionId) {
      return this._updateExistingSession(
        existingSessionId,
        nextlink,
        totalItems,
        direction,
      );
    }
    return this._createNewSession(nextlink, totalItems);
  }

  async getLinkFromSession(
    sessionId: string,
    direction: 'next' | 'prev',
  ): Promise<string | null> {
    const session = await this._getSession(sessionId);
    if (!session) return null;

    if (direction === 'next') {
      return session.navigation[session.currentPage + 1] || null;
    }
    if (direction === 'prev') {
      if (session.currentPage === 1) return null;
      return session.navigation[session.currentPage - 1] || null;
    }
    return null;
  }

  private async _updateExistingSession(
    sessionId: string,
    nextlink: string,
    totalItems?: number,
    direction?: 'next' | 'prev',
  ): Promise<PaginationResult> {
    const session = await this._getSession(sessionId);
    if (!session) {
      return this._createNewSession(nextlink);
    }

    const updatedSession = this._calculateUpdatedSession(
      session,
      nextlink,
      direction,
    );
    await this._cacheSession(sessionId, updatedSession);

    return {
      paginationSessionId: sessionId,
      currentPage: updatedSession.currentPage,
      totalItems: totalItems ?? null,
    };
  }

  private _calculateUpdatedSession(
    session: PaginationSession,
    nextlink: string,
    direction?: 'next' | 'prev',
  ): PaginationSession {
    if (direction === 'next') {
      return {
        ...session,
        navigation: {
          ...session.navigation,
          [session.currentPage + 2]: nextlink,
        },
        currentPage: session.currentPage + 1,
      };
    }

    return {
      ...session,
      navigation: Object.fromEntries(
        Object.entries(session.navigation).filter(
          ([key]) =>
            key !== (session.currentPage + 1).toString() ||
            session.currentPage === 1,
        ),
      ),
      currentPage: Math.max(1, session.currentPage - 1),
    };
  }

  private async _createNewSession(
    nextlink: string,
    totalItems?: number,
  ): Promise<PaginationResult> {
    const newSessionId = randomUUID();
    const newSession: PaginationSession = {
      navigation: {
        2: nextlink,
      },
      currentPage: 1,
    };

    await this._cacheSession(newSessionId, newSession);
    return {
      paginationSessionId: newSessionId,
      currentPage: 1,
      totalItems: totalItems ?? null,
    };
  }

  private async _cacheSession(
    sessionId: string,
    session: PaginationSession,
  ): Promise<void> {
    await this.cacheManager.set(
      sessionId,
      session,
      this.PAGINATION_SESSION_TTL_MS,
    );
  }

  private async _getSession(
    sessionId: string,
  ): Promise<PaginationSession | null> {
    const session = await this.cacheManager.get<PaginationSession>(sessionId);
    return session || null;
  }
}
