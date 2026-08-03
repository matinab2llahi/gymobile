type usernameType = string | null;

export const paths = {
    home: ()=> "/",
    login: ()=> "/login",
    onboarding: ()=> "/onboarding",


    messages: ()=> "/messages",
    explore: ()=> "/explore",
    programs : ()=> "/programs",
    username: (username_id ?: usernameType)=> `/${username_id ? username_id : ""}`,
    user_plans: (username_id ?: usernameType)=> `/${username_id ? username_id : ""}/plans`,
    user_comments: (username_id ?: usernameType)=> `/${username_id ? username_id : ""}/comments`,
}