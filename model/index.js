import User from "./User";
import Role from "./Role";
import UserRole from "./UserRole";
import Chat from "./Chat";
import MemberChat from "./MemberChat";
import Message from "./Message";
import Post from "./Post";
import PostComment from "./PostComment";
import PostLike from "./PostLike";
import Image from "./Image";
import Friend from "./Friend";
import GroupPage from "./GroupPage";
import GroupMember from "./GroupMember";

User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
User.hasMany(MemberChat, { foreignKey: "user_id" });
User.hasMany(Post, { foreignKey: "created_by" });
User.hasMany(Friend, { foreignKey: "user_id" });

Role.belongsToMany(User, { through: UserRole, foreignKey: "id_role" });

Chat.hasMany(Message, { foreignKey: "chat_id" });
Chat.hasMany(MemberChat, { foreignKey: "chat_id" });

Message.belongsTo(Chat, { foreignKey: "chat_id" });
Message.belongsTo(User, { foreignKey: "sender" });

MemberChat.belongsTo(Chat, { foreignKey: "chat_id" });
MemberChat.belongsTo(User, { foreignKey: "user_id" });

Post.belongsTo(User, { foreignKey: "created_by" });
Post.hasMany(PostComment, { as: "comment", foreignKey: "post_id" });
Post.hasMany(PostLike, { as: "like", foreignKey: "post_id" });
Post.hasMany(Image, { foreignKey: "post_id" });
Post.belongsTo(GroupPage, { foreignKey: "group_id" });

PostComment.belongsTo(User, { foreignKey: "created_by" });
PostComment.belongsTo(Post, { foreignKey: "post_id" });

PostLike.belongsTo(User, { foreignKey: "created_by" });
PostLike.belongsTo(Post, { foreignKey: "post_id" });

Image.belongsTo(Post, { foreignKey: "post_id" });

Friend.belongsTo(User, { as: "user_friend", foreignKey: "friend" });
Friend.belongsTo(User, { as: "user", foreignKey: "user_id" });

GroupPage.belongsTo(User, { foreignKey: "created_by" });
GroupPage.hasMany(GroupMember, { foreignKey: "group_id" });

GroupMember.belongsTo(User, { foreignKey: "user_id" });

export {
    User,
    Role,
    Chat,
    MemberChat,
    Message,
    Post,
    PostLike,
    PostComment,
    Image,
    Friend,
    GroupMember,
    GroupPage,
};