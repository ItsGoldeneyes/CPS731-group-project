export default function getToken() {
    const tokenString = localStorage.getItem('token');
    return tokenString;
}