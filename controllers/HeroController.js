import Hero from '../models/Hero';
import Message from '../models/Message';

let SQLite = require('react-native-sqlite-storage');
let sqlite = SQLite.openDatabase({ name: 'hero-db', createFromLocation: '~database/hero-db.sqlite' });

// result: boolean
export const createHero = (hero: Hero) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!hero) {
            msg.result = false;
            msg.message = 'Invalid hero input!';
            resolve({ result: msg.result, message: msg.message });
        }

        sqlite.transaction((tx) => {
            tx.executeSql('INSERT INTO Hero(HeroName) VALUES (?)', [hero.heroName], (tx, results) => {
                if (results.rowsAffected > 0) {
                    msg.result = true;
                    msg.message = 'Create new hero successfully!';
                } else {
                    msg.result = false;
                    msg.message = 'Create new hero failed!';
                }
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = false;
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
            });
        })
    });
}

// result: realm objects
export const getAllHeroes = () => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        sqlite.transaction((tx) => {
            tx.executeSql('SELECT * FROM Hero', [], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    let item = results.rows.item(i);
                    let hero = new Hero(item.HeroId, item.HeroName);
                    msg.result.push(hero);
                }
                msg.message = 'Get all heroes successfully!';
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = [];
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
            });
        })
    });
}

// result: realm object
export const getHeroById = (id: number) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        sqlite.transaction((tx) => {
            tx.executeSql('SELECT * FROM Hero WHERE HeroId=?', [id], (tx, results) => {
                if (results.rows.length > 0) {
                    let item = results.rows.item(0);
                    let hero = new Hero(item.HeroId, item.HeroName);
                    msg.result = hero;
                    msg.message = `Found 1 hero with id=${id}`;
                } else {
                    msg.result = null;
                    msg.message = `Not found hero with id=${id}`;
                }
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = null;
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
            });
        })
    });
}

const checkIfHeroExists = (id: number) => {
    getHeroById(id).then(({ result, message }) => {
        let msg = new Message();
        msg.result = hero != null;
        if (msg.result)
            msg.message = `Found 1 hero with id=${id}`;
        else msg.message = `Not found hero with id=${id}`;
        resolve({ result: msg.result, message: msg.message });
    });
}

export const updateHero = (hero: Hero) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!hero) {
            msg.result = false;
            msg.message = 'Invalid hero input!';
            resolve({ result: msg.result, message: msg.message });
        }

        sqlite.transaction((tx) => {
            tx.executeSql('UPDATE Hero SET HeroName=? WHERE HeroId=?', [hero.heroName, hero.heroId], (tx, results) => {
                if (results.rowsAffected > 0) {
                    msg.result = true;
                    msg.message = 'Update hero successfully!';
                } else {
                    msg.result = false;
                    msg.message = 'Update hero failed!';
                }
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = false;
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
            });
        })
    });
}

export const deleteHero = (hero: Hero) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!hero) {
            msg.result = false;
            msg.message = 'Invalid hero input!';
            resolve({ result: msg.result, message: msg.message });
        }

        sqlite.transaction((tx) => {
            tx.executeSql('DELETE FROM Hero WHERE HeroId=?', [hero.heroId], (tx, results) => {
                if (results.rowsAffected > 0) {
                    msg.result = true;
                    msg.message = `Delete hero with id=${hero.heroId} successfully!`;
                } else {
                    msg.result = false;
                    msg.message = `Not found hero with id=${hero.heroId}`;
                }
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = false;
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
            });
        })
    });
}