module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
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
        tags: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
        titleOfNote: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        contain: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        isPrivate: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
    Note.associate = function (models) {
        Note.belongsTo(models.User, {foreignKey: 'userId', sourceKey: 'id',})
    };
    return Note;
};