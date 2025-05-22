import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PaginationSession } from './interfaces';
import { randomUUID } from 'crypto';
@Injectable()
export class OasisPaginationService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async handlePagination(
    existingSessionId: string | undefined,
    nextlink: string,
    direction?: 'next' | 'prev',
  ): Promise<{
    paginationSessionId: string;
    currentPage: number;
  }> {
    if (existingSessionId) {
      // Update existing session
      const session = await this.getSession(existingSessionId);

      if (session) {
        let updatedNavigation;
        let updatedCurrentPage;

        // Handle navigation updates based on direction
        if (direction === 'next') {
          // When moving forward, add the next link to navigation
          updatedNavigation = {
            ...session.navigation,
            [session.currentPage + 2]: nextlink,
          };
          updatedCurrentPage = session.currentPage + 1;
        } else {
          // When moving backward, remove the next page link unless on page 1
          updatedNavigation = Object.fromEntries(
            Object.entries(session.navigation).filter(
              ([key]) =>
                key !== (session.currentPage + 1).toString() ||
                session.currentPage === 1,
            ),
          );
          // Don't let current page go below 1
          updatedCurrentPage = Math.max(1, session.currentPage - 1);
        }

        const updatedSession = {
          ...session,
          navigation: updatedNavigation,
          currentPage: updatedCurrentPage,
        };

        console.log('updatedSession', updatedSession);

        // Cache the updated session
        await this.cacheManager.set(
          existingSessionId,
          updatedSession,
          60 * 60 * 1000,
        );
        return {
          paginationSessionId: existingSessionId,
          currentPage: updatedSession.currentPage,
        };
      }
    }

    // Create new session
    const newSessionId = randomUUID();
    const newSession: PaginationSession = {
      id: newSessionId,
      navigation: {
        2: nextlink,
      },
      currentPage: 1,
    };
    console.log('newSession', newSession);
    await this.cacheManager.set(newSessionId, newSession, 60 * 60 * 1000);
    return {
      paginationSessionId: newSessionId,
      currentPage: 1,
    };
  }

  async getSession(sessionId: string): Promise<PaginationSession | null> {
    const session = await this.cacheManager.get<PaginationSession>(sessionId);
    return session || null;
  }

  // TODO - clear session method

  async getLinkFromSession(
    sessionId: string,
    direction: 'next' | 'prev',
  ): Promise<string | null> {
    const session = await this.getSession(sessionId);
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
}
