module.exports = ( sequelize, DataTypes ) => {
    const Blog = sequelize.define('Blog', {
        namegym: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        address: DataTypes.STRING,
        price: DataTypes.STRING,
        player: DataTypes.STRING,
        service: DataTypes.STRING,
        time: DataTypes.STRING,
        piclogo: DataTypes.STRING,
        thumbnaillogo: DataTypes.STRING
    })
    return Blog
}