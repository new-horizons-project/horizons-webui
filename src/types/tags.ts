export type Colors = {
    backgroundColorString: string
    borderColorString: string
}

export type RGB = {
    r: number
    g: number
    b: number
}

export class Tag {
    public id: number
    public name: string
    private baseColor: RGB

    constructor(
        id: number, 
        name: string,
        baseColor?: RGB
    ) {
        this.id = id;
        this.name = name;

        if (baseColor === undefined) {
            this.baseColor = Tag.generateRandomColor();
            return;
        }
        
        this.baseColor = baseColor;
    }

    private static generateRandomColor(): RGB {
        return {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
    }

    public getColorStrings(): Colors {
        return {
            backgroundColorString: 
                `rgba(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b}, 0.3)`,
            borderColorString: 
                `rgba(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b}, 1)`
        }
    }
}