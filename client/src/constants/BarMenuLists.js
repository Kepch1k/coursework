const PHONE_NUMBER = {
    name: "(877) 355-3585",
    link: "",
    list: null,
    tag: "phone"
};

const ACTIVE_CONTESTS = {
    name: "Active Contests",
    link: "/active_contests",
    list: [
        {
            name: "All",
            link: "/"
        },
        {
            name: "Naming",
            link: "/"
        },
        {
            name: "logos",
            link: "/"
        },
        {
            name: "Tagline",
            link: "/"
        },
        {
            name: "Beta: Marketplace Only Contests",
            link: "/"
        },
    ]
};

const MARKET_PLACE = {
    name: "Marketplace",
    link: "/",
    list: [
        {
            name: "My Dashboard",
            link: "/"
        },
        {
            name: "My Listings",
            link: "/"
        },
        {
            name: "Explore Marketplace",
            link: "/"
        },
        {
            name: "Learn More",
            link: "/"
        }
    ]
};

const EXAMPLES = {
    name: "Examples",
    link: "/",
    list: [
        {
            name: "Names",
            link: "/"
        },
        {
            name: "Taglines",
            link: "/"
        },
        {
            name: "Logos",
            link: "/"
        }
    ]
};

const WINNERS = {
    name: "Winners",
    link: "/",
    list: [
        {
            name: "Recent Winners",
            link: "/"
        },
        {
            name: "Leaderboard",
            link: "/"
        }
    ]
};

const HELP = {
    name: "help",
    link: "/",
    list: [
        {
            name: "FAQs",
            link: "/"
        },
        {
            name: "Contact Us",
            link: "/"
        },
        {
            name: "Testimonials",
            link: "/"
        },
        {
            name: "How It Works",
            link: "/"
        },
        {
            name: "Pricing",
            link: "/"
        }
    ]
};

const START_CONTEST = {
    name: "Start Contest",
    link: "/contest_creating/",
    list: null
};

module.exports =
    {
        PHONE_NUMBER,
        ACTIVE_CONTESTS,
        MARKET_PLACE,
        EXAMPLES,
        WINNERS,
        HELP,
        START_CONTEST
    };
