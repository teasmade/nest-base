import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { OasisPaginationService } from './oasis-pagination.service';
import { PaginationSession } from './interfaces';
import { Cache } from 'cache-manager';

describe('OasisPaginationService', () => {
  let service: OasisPaginationService;

  const mockCacheManager: Partial<Cache> = {
    get: jest.fn().mockImplementation(async () => await Promise.resolve(null)),
    set: jest
      .fn()
      .mockImplementation(async () => await Promise.resolve(undefined)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OasisPaginationService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<OasisPaginationService>(OasisPaginationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handlePagination', () => {
    it('should create a new session when no existing session ID is provided', async () => {
      const nextlink = 'https://api.example.com/next';
      const totalItems = 100;

      const result = await service.handlePagination(
        undefined,
        nextlink,
        totalItems,
      );

      expect(result.paginationSessionId).toBeDefined();
      expect(result.currentPage).toBe(1);
      expect(result.totalItems).toBe(totalItems);
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          navigation: { 2: nextlink },
          currentPage: 1,
        }),
        expect.any(Number),
      );
    });

    it('should update existing session when session ID is provided', async () => {
      const sessionId = 'test-session-id';
      const existingSession: PaginationSession = {
        navigation: {
          2: 'https://api.example.com/page2',
        },
        currentPage: 1,
      };
      const nextlink = 'https://api.example.com/page3';

      (mockCacheManager.get as jest.Mock).mockResolvedValueOnce(
        existingSession,
      );

      const result = await service.handlePagination(
        sessionId,
        nextlink,
        undefined,
        'next',
      );

      expect(result.paginationSessionId).toBe(sessionId);
      expect(result.currentPage).toBe(2);
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        sessionId,
        expect.objectContaining({
          navigation: {
            2: 'https://api.example.com/page2',
            3: nextlink,
          },
          currentPage: 2,
        }),
        expect.any(Number),
      );
    });

    it('should create new session when existing session is not found', async () => {
      const sessionId = 'non-existent-session';
      const nextlink = 'https://api.example.com/next';

      (mockCacheManager.get as jest.Mock).mockResolvedValueOnce(null);

      const result = await service.handlePagination(sessionId, nextlink);

      expect(result.paginationSessionId).toBeDefined();
      expect(result.currentPage).toBe(1);
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          navigation: { 2: nextlink },
          currentPage: 1,
        }),
        expect.any(Number),
      );
    });
  });

  describe('getLinkFromSession', () => {
    it('should return next page link when direction is next', async () => {
      const sessionId = 'test-session';
      const session: PaginationSession = {
        navigation: {
          2: 'https://api.example.com/page2',
          3: 'https://api.example.com/page3',
        },
        currentPage: 1,
      };

      (mockCacheManager.get as jest.Mock).mockResolvedValueOnce(session);

      const result = await service.getLinkFromSession(sessionId, 'next');

      expect(result).toBe('https://api.example.com/page2');
    });

    it('should return previous page link when direction is prev', async () => {
      const sessionId = 'test-session';
      const session: PaginationSession = {
        navigation: {
          2: 'https://api.example.com/page2',
          3: 'https://api.example.com/page3',
        },
        currentPage: 3,
      };

      (mockCacheManager.get as jest.Mock).mockResolvedValueOnce(session);

      const result = await service.getLinkFromSession(sessionId, 'prev');

      expect(result).toBe('https://api.example.com/page2');
    });

    it('should return null when session is not found', async () => {
      const sessionId = 'non-existent-session';

      (mockCacheManager.get as jest.Mock).mockResolvedValueOnce(null);

      const result = await service.getLinkFromSession(sessionId, 'next');

      expect(result).toBeNull();
    });

    it('should return null when trying to go previous from first page', async () => {
      const sessionId = 'test-session';
      const session: PaginationSession = {
        navigation: {
          2: 'https://api.example.com/page2',
        },
        currentPage: 1,
      };

      (mockCacheManager.get as jest.Mock).mockResolvedValueOnce(session);

      const result = await service.getLinkFromSession(sessionId, 'prev');

      expect(result).toBeNull();
    });

    it('should return null when next page link does not exist', async () => {
      const sessionId = 'test-session';
      const session: PaginationSession = {
        navigation: {
          2: 'https://api.example.com/page2',
        },
        currentPage: 2,
      };

      (mockCacheManager.get as jest.Mock).mockResolvedValueOnce(session);

      const result = await service.getLinkFromSession(sessionId, 'next');

      expect(result).toBeNull();
    });
  });

  describe('_calculateUpdatedSession', () => {
    it('should correctly update session when moving forward', async () => {
      const sessionId = 'test-session';
      const session: PaginationSession = {
        navigation: {
          2: 'https://api.example.com/page2',
        },
        currentPage: 1,
      };
      const nextlink = 'https://api.example.com/page3';

      (mockCacheManager.get as jest.Mock).mockResolvedValueOnce(session);

      await service.handlePagination(sessionId, nextlink, undefined, 'next');

      expect(mockCacheManager.set).toHaveBeenCalledWith(
        sessionId,
        expect.objectContaining({
          navigation: {
            2: 'https://api.example.com/page2',
            3: nextlink,
          },
          currentPage: 2,
        }),
        expect.any(Number),
      );
    });

    it('should correctly update session when moving backward', async () => {
      const sessionId = 'test-session';
      const session: PaginationSession = {
        navigation: {
          2: 'https://api.example.com/page2',
          3: 'https://api.example.com/page3',
        },
        currentPage: 2,
      };

      (mockCacheManager.get as jest.Mock).mockResolvedValueOnce(session);

      await service.handlePagination(
        sessionId,
        'https://api.example.com/page2',
        undefined,
        'prev',
      );

      expect(mockCacheManager.set).toHaveBeenCalledWith(
        sessionId,
        expect.objectContaining({
          navigation: {
            2: 'https://api.example.com/page2',
          },
          currentPage: 1,
        }),
        expect.any(Number),
      );
    });
  });
});
