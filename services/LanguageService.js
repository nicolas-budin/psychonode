const {QueryTypes, Sequelize, DataTypes, Model} = require('sequelize');


// creates rdbms access
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sample.db'
});

// tests connection
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch(error => {
    console.error('Unable to connect to the database:', error)
});


/**
 * Stores list of available languages
 */

class LanguageCv extends Model {
}

LanguageCv.init({

    language: {
        type: DataTypes.STRING,
        primaryKey: true
    }
}, {

    sequelize,
    modelName: 'language_cv',
    freezeTableName: true
});

const findAllLanguages = async () => {

    try {
        const languages = await LanguageCv.findAll({
            order: [['language', 'ASC']]
        });

        return languages;

    } catch (error) {
        console.error("Failed to get list of languages", error);
        throw error;
    }

}

/**
 * Stores list of available languages
 */

class UITextElements extends Model {
}

UITextElements.init({

    key: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    language: {
        type: DataTypes.STRING
    },
    value: {
        type: DataTypes.STRING
    }
}, {

    sequelize,
    modelName: 'ui_text_elements',
    freezeTableName: true,
    timestamps: false,
});



const getUITextElementsMap = async (language) => {
    try {
        const uITextElements = await UITextElements.findAll({
            where: {
                language: language
            },
            order: [['key', 'DESC']]
        });

        let uITextElementsMap = {};

        uITextElements.forEach(uITextElement => {uITextElementsMap[uITextElement.key] = uITextElement.value;})

        return uITextElementsMap;

    } catch (error) {
        console.error("Failed to get UI text elements for language: " + language, error);
        throw error;
    }
}

exports.findAllLanguages = findAllLanguages;
exports.getUITextElementsMap = getUITextElementsMap;





