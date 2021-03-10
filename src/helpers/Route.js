class Route {
    get about() {
        return `/about`;
    }
    get course() {
        return `/khoa-hoc`;
    }
    get signin() {
        return `/signin`;
    }

    get signup() {
        return `/signup`;
    }

    get user() {
        return `/user`;
    }

    get search() {
        return `/tim-kiem`;
    }

    get category() {
        return `/danh-muc`;
    }
}

export default new Route();
