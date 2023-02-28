#!/usr/bin/env node

const fs = require("fs");
import models from "./models";

for (const model in models) {
  const tableName = models[model].tableName;

  let defaultValue = "";
  let onUpdate = "";
  let type = "";
  let template = `'use strict';
  \/** Script Provided by https://github.com/caceresjayder *\/
  \/** @type {import('sequelize-cli').Migration} *\/
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('${tableName}', {\n`;

  const attributes = models[model].tableAttributes;

  for (const column in attributes) {
    delete attributes[column].Model;
    delete attributes[column].fieldName;
    delete attributes[column].field;
    delete attributes[column]._modelAttribute;

    template += `      ${column}: {\n`;

    if (attributes[column].defaultValue) {
      if (
        JSON.stringify(attributes[column].defaultValue)
          .toString()
          .match(/NOW/i) ||
        JSON.stringify(attributes[column].defaultValue)
          .toString()
          .match(/CURRENT_TIMESTAMP/i)
      ) {
        defaultValue = "Sequelize.literal('CURRENT_TIMESTAMP')";
      } else {
        defaultValue = attributes[column].defaultValue.toString();
      }
    }

    if (attributes[column].onUpdate) {
      if (
        JSON.stringify(attributes[column].onUpdate).toString().match(/NOW/i) ||
        JSON.stringify(attributes[column].onUpdate)
          .toString()
          .match(/CURRENT_TIMESTAMP/i)
      ) {
        defaultValue = "Sequelize.literal('CURRENT_TIMESTAMP')";
        onUpdate = "Sequelize.literal('CURRENT_TIMESTAMP')";
      }
    }

    if (attributes[column].type) {
      let dataType = attributes[column].type.toString();
      dataType = dataType.replace("DATETIME", "DATE");
      dataType = dataType.replace("VARCHAR", "STRING");
      dataType = dataType.replace("(255)", "");
      dataType = dataType.replace(/TIMESTAMP WITH TIME ZONE/g, "DATE");
      dataType = dataType.split(" ").join(".");
      type = `Sequelize.${dataType}`;
    }

    for (const property in attributes[column]) {
      if (property.toString().match(/^_/i)) {
        delete attributes[column][property];
      }
      if (property === "type") {
        if (type === "Sequelize.ENUM") {
          template += `        type: ${type}`;
        } else {
          template += `        type: ${type},\n`;
        }
      } else if (property === "defaultValue") {
        if (column === "createdAt") {
          template += `        defaultValue: ${defaultValue},\n`;
        } else {
          template += `        defaultValue: '${attributes[column].defaultValue}',\n`;
        }
      } 
      else if (property === "onUpdate") {
        template += `        defaultValue: ${defaultValue},\n`;
        template += `        onUpdate: ${onUpdate},\n`;
      } else if (property === "values") {
        const length = attributes[column][property].length - 1;
        template += `(`;
        for (const values in attributes[column][property]) {
          if (parseInt(values) === length) {
            template += `'${attributes[column][property][values]}'`;
          } else {
            template += `'${attributes[column][property][values]}', `;
          }
        }
        template+= `)\n`
      }
      else {
        if (typeof attributes[column][property] === "object") {
          template += `        ${property}: {\n`;
          for (const p in attributes[column][property]) {
            if (typeof attributes[column][property][p] === "object") {
              template += `          ${p}: {\n`;
              for (const sp in attributes[column][property][p]) {
                template += `            ${sp}: '${attributes[column][property][p][sp]}',\n`;
              }
              template += "          },\n";
            } else {
              if (typeof attributes[column][property][p] === "boolean") {
                template += `          ${p}: ${attributes[column][property][p]},\n`;
              } else {
                template += `          ${p}: '${attributes[column][property][p]}',\n`;
              }
            }
          }
          template += "        },\n";
        } else {
          if (typeof attributes[column][property] === "boolean") {
            template += `        ${property}: ${attributes[column][property]},\n`;
          } else {
            template += `        ${property}: '${attributes[column][property]}',\n`;
          }
        }
      }
    }
    template += "      },\n";
  }

  template += `    });
  },\n
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('${tableName}');
  },
};\n`;

  if (models[model].tableName !== undefined) {
    const now = new Date();
    fs.writeFileSync(
      `${__dirname}/migrations/${now
        .toISOString()
        .replace(/[^\d]/g, "")
        .slice(0, -3)}-create-${models[model].tableName}.js`,
      template
    );
  }
}
