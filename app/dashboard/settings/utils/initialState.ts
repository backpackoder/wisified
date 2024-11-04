// Assets
import NO_PROFILE_IMAGE from "@/app/assets/images/no-profile-image.jpg";

export const initialState = {
  username: "" as string,
  name: "Unknown" as string,
  image: NO_PROFILE_IMAGE.src as string,
  bio: "" as string,
  nationality: "Unknown" as string,
  emailUpdates: false as boolean,
  language: "en" as string,
};
