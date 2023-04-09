import TypeObjectStroe from "../type";

const webUser: TypeObjectStroe = {
  keyPath: "userId",
  indexs: ["mobile", "password", "status"],
};
const userObjectStore = {
  web_user: webUser,
};

export default userObjectStore;
