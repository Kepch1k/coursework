module.exports = (sequelize, DataTypes) => {
    const Contest = sequelize.define('Contest', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                key: 'id',
                model: 'User',
            },
        },
        titleOfContest: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        typeOfContest: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        typeOfIndustry: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        whatVentureDoes: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        inputNameOfTheirVenture: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        targetCustomers: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        typeOfName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        visualBrandStyle: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
            defaultValue: null,
        },
        preferenceForName: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
            defaultValue: null,
        },
        preferenceForTagline: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
            defaultValue: null,
        },
        media: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
            defaultValue: null,
        },
        price: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 33,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Not Paid',
        },

        winner: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
    });


    Contest.associate = function (models) {
        Contest.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id',});
        Contest.hasMany(models.Entry, {foreignKey: 'contestId', targetKey: 'id'});
    };

    return Contest;
};