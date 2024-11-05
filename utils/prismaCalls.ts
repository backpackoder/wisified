export const PRISMA_CALLS = {
  language: {
    include: {
      authors: true,
      quotes: true,
      tags: true,
    },
  },

  author: {
    include: {
      translations: {
        include: {
          language: true,
        },
      },
      // _count: {
      //   select: { quotes: true },
      // },
      quotes: true,
    },
  },

  authorAndQuotes: {
    include: {
      translations: {
        include: {
          language: true,
        },
      },
      quotes: {
        include: {
          author: true,
          comments: true,
          createdBy: true,
          favoritedBy: true,
          favorites: true,
          tags: true,
          translations: {
            include: {
              language: true,
              quote: true,
            },
          },
          updatedBy: true,
        },
      },
    },
  },

  quoteAndAuthor: {
    include: {
      author: {
        include: {
          createdBy: true,
          favoriteAuthors: true,
          favoritedBy: true,
          quotes: true,
          translations: {
            include: {
              author: true,
              language: true,
            },
          },
          updatedBy: true,
        },
      },
      comments: true,
      createdBy: true,
      favoritedBy: true,
      favorites: true,
      tags: true,
      translations: {
        include: {
          quote: true,
          language: true,
        },
      },
      updatedBy: true,
    },
  },

  authorTranslation: {
    include: {
      language: true,
      author: true,
    },
  },

  quote: {
    include: {
      author: true,
      comments: true,
      createdBy: true,
      favoritedBy: true,
      favorites: true,
      tags: true,
      translations: {
        include: {
          language: true,
          quote: true,
        },
      },
      updatedBy: true,
    },
  },

  quoteTranslation: {
    include: {
      language: true,
      quote: true,
    },
  },

  tag: {
    include: {
      translations: {
        include: {
          language: true,
        },
      },
      quotes: true,
    },
  },

  tagTranslation: {
    include: {
      language: true,
      tag: true,
    },
  },

  comment: {
    include: {
      likes: true,
      quote: true,
      replies: true,
      user: true,
    },
  },

  commentLike: {
    include: {
      comment: true,
      user: true,
    },
  },

  commentReply: {
    include: {
      comment: true,
      likes: true,
      user: true,
    },
  },

  commentReplyLike: {
    include: {
      reply: true,
      user: true,
    },
  },

  account: {
    include: {
      user: true,
    },
  },

  session: {
    include: {
      user: true,
    },
  },

  user: {
    include: {
      accounts: true,
      authors: true,
      commentLikes: true,
      commentReplies: true,
      CommentReplyLike: true,
      comments: true,
      createdAuthors: true,
      createdQuotes: true,
      favoriteAuthors: true,
      favoriteQuotes: true,
      followedBy: true,
      following: true,
      quotes: true,
      sessions: true,
      updatedAuthors: true,
      updatedQuotes: true,
    },
  },

  follow: {
    include: {
      follower: true,
      following: true,
    },
  },

  favoriteAuthor: {
    include: {
      author: true,
      user: true,
    },
  },

  favoriteQuote: {
    include: {
      quote: true,
      user: true,
    },
  },
};
