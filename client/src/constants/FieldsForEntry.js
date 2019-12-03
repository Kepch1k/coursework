const FIELDS = {
    NAME: {
        type: "text",
        name: "nameEntry",
        component: "renderField",
        placeholder: "e.g. LionFord",
        label: "Enter the Name"
    },
    TAGLINE_OR_SLOGAN: {
        type: "text",
        name: "taglineOrSloganEntry",
        component: "renderField",
        placeholder: "e.g. \"Better late than never!\"",
        label: "Enter the Slogan"
    },
    LOGO: {
        type: "file",
        name: "logoEntry",
        component: "renderFileInput",
        label: "Please upload file here",
        multiple: false
    },
};

module.exports =
    {
        FIELDS
    };