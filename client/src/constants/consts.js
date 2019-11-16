const USER_KEY = "USER";
const TOKENS_KEY = "TOKENS";
const FILTER_TAGS = {
    originalName: {Industries: 'typeOfIndustry', Categories: 'typeOfContest'},
    label: ['Industries', 'Categories',],
    toSend: ['typeOfIndustry', 'id', 'typeOfContest', 'status', 'price'],
    categoriesAssociation: {
        'Naming only': "NAME",
        'Logo only': "LOGO",
        'Tagline only': "TAGLINE_OR_SLOGAN",
    }
};

const FIELDS_NAME_HUMANIZE = {
    typeOfContest: "Type of Contest",
    typeOfIndustry: "Type of Industry",
    whatVentureDoes: "What is your Business/ Brand about?",
    inputNameOfTheirVenture: "The name of Venture",
    targetCustomers: "Target Customers",
    typeOfName: "Preferred Type of Name",
    visualBrandStyle: "Preferred for Visual Style",
    preferenceForName: "Preferred Style of Name",
    preferenceForTagline: "Preferred Style of Tagline",
    winner: "The Winner",
    media: "Added files",
};


const NO_NEEDED_FIELDS = ['createdAt', 'updatedAt', 'id', 'numberOfEntries', 'status', 'price', 'userId', 'titleOfContest'];
const LOADING_ITEMS = ["a Company", "a Brand", "a Website", "a Service", "a Book", "a Business", "an App", "a Product", "a Startup"];
const TEXT_PROGRESSING = {
    START: "Select Contest Type",
    NAME: "About Your Business",
    LOGO: "Naming Preferences",
    TAGLINE_OR_SLOGAN: "Naming Preferences",
    CHECKOUT: "LAST STEP"
};
const CONTEST_HEADER = {
    START: {
        label: 'START A CONTEST',
        text: "Launching a contest on Squadhelp is very simple. Select the type of contest you would like to launch from the list below.Provide a detailed " +
            "brief and select a pricing package. Begin receiving submissions instantly!"
    },
    NAME: {
        label: 'NAME',
        text: "Since you have selected a bundle, let us first setup your Naming contest. Once you have selected your Naming, you will be able to launch your next contest"
    },
    CHECKOUT: {
        label: 'CHECKOUT',
        text: "Since you have selected a bundle, let us first setup your Naming contest. Once you have selected your Naming, you will be able to launch your next contest"
    },
    LOGO: {
        label: 'LOGO',
        text: "Tell us a bit more about your business as well as your preferences so that creatives get a better idea about what you are looking for"
    },
    TAGLINE_OR_SLOGAN: {
        label: 'TAGLINE',
        text: "Tell us a bit more about your business as well as your preferences so that creatives get a better idea about what you are looking for"
    }
};
const LIST_NAMES = ["NAME IDEAS", "CONTESTS", "OUR WORK", "NAMES FOR SALE", "BLOG"];
const startValueContestProgressing = 1;
module.exports =
    {
        USER_KEY,
        TOKENS_KEY,
        LOADING_ITEMS,
        TEXT_PROGRESSING,
        LIST_NAMES,
        startValueContestProgressing,
        CONTEST_HEADER,
        FILTER_TAGS,
        NO_NEEDED_FIELDS,
        FIELDS_NAME_HUMANIZE
    };
