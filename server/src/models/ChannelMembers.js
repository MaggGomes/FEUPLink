module.exports = (sequelize, DataTypes) => {
    const ChannelMembers = sequelize.define('ChannelMembers', {
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isVisible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            freezeTableName: true,
        }
        );

        ChannelMembers.associate = (models) => {
        // Need to establish association in or to use 'include' in queries
        ChannelMembers.belongsTo(models.Channel,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
        );

        // Need to establish association in or to use 'include' in queries
        ChannelMembers.belongsTo(models.Person,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
        );
    };

    return ChannelMembers;
};
