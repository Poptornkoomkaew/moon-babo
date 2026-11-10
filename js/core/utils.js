/**
 * @fileoverview core/utils.js : General utility helper functions.
 */

/**
 * Shorthand for document.getElementById.
 * @param {string} id - The element ID.
 * @returns {HTMLElement|null} The matching element.
 */
const $ = id => document.getElementById(id);

/**
 * Generates a random floating-point number between a and b.
 * @param {number} a - Minimum value.
 * @param {number} b - Maximum value.
 * @returns {number} Random value between a and b.
 */
const rnd = (a, b) => a + Math.random() * (b - a);

