export const PRISMA_CALLS = {
  quotes: {
    include: {
      createdBy: true,
      updatedBy: true,
      translations: true,
      tags: {
        include: {
          translations: true,
        },
      },
      author: {
        include: {
          translations: true,
        },
      },
      favorites: true,
      favoritedBy: true,
      comments: {
        include: {
          user: true,
          likes: {
            include: {
              user: true,
              replies: {
                include: {
                  user: true,
                  likes: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          },
          replies: {
            include: {
              user: true,
              likes: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  },

  authors: {
    include: {
      translations: {
        include: {
          language: true,
        },
      },
      _count: {
        select: { quotes: true },
      },
      quotes: {
        include: {
          translations: {
            include: {
              language: true,
            },
          },
        },
      },
    },
  },
};
