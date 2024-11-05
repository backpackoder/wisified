export type WikiAuthorDatas = {
  name: string;
  description: string;
  bio: string;
  wikipediaLink: {
    desktop?: string;
    mobile?: string;
  };
  imageSrc?: string;
};
