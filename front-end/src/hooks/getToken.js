export default function getToken() {
    const tokenString = localStorage.getItem('user_id');
    return JSON.parse(tokenString);
}