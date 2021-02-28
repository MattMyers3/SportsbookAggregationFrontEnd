export const apiUrl = "https://www.oddslibrary.com/api";

const prod = {
    redirectUrl: "https://www.oddslibrary.com/login/callback"
};

const dev = {
    redirectUrl: "http://localhost:3000/login/callback"
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;