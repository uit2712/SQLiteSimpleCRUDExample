export default class Hero {
    heroId: number;
    heroName: string;

    constructor(heroId = 1, heroName = '') {
        this.heroId = heroId;
        this.heroName = heroName;
    }

    getRealmObject() {
        return {
            heroId: this.heroId,
            heroName: this.heroName
        };
    }

    updateObjectInfo(hero: any) {
        if (!hero)
            return;

        hero['heroName'] = this.heroName;
    }

    clone() {
        return new Hero(this.heroId, this.heroName);
    }
}

const HeroSchema = {
    name: 'Hero',
    properties: {
        heroId: 'int',
        heroName: 'string'
    }
};

Hero.schema = HeroSchema;