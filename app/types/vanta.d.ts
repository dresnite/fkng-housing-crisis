declare module 'vanta/dist/vanta.globe.min' {
    interface VantaGlobeOptions {
        el: HTMLElement | null;
        THREE: any;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        color?: number | string;
        color2?: number | string;
        size?: number;
        backgroundColor?: number | string;
        points?: number;
        maxDistance?: number;
        spacing?: number;
        showDots?: boolean;
        showLines?: boolean;
        backgroundAlpha?: number;
        amplitudeFactor?: number;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        speed?: number;
        forceAnimate?: boolean;
    }

    interface VantaEffect {
        setOptions: (options: Partial<VantaGlobeOptions>) => void;
        resize: () => void;
        destroy: () => void;
    }

    export default function GLOBE(options: VantaGlobeOptions): VantaEffect;
}

// Additional Vanta effect types
declare module 'vanta/dist/vanta.waves.min' {
    interface VantaWavesOptions {
        el: HTMLElement | null;
        THREE: any;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        color?: number | string;
        shininess?: number;
        waveHeight?: number;
        waveSpeed?: number;
        zoom?: number;
    }

    interface VantaEffect {
        setOptions: (options: Partial<VantaWavesOptions>) => void;
        resize: () => void;
        destroy: () => void;
    }

    export default function WAVES(options: VantaWavesOptions): VantaEffect;
}

declare module 'vanta/dist/vanta.cells.min' {
    interface VantaCellsOptions {
        el: HTMLElement | null;
        THREE: any;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        color?: number | string;
        color2?: number | string;
        size?: number;
        speed?: number;
    }

    interface VantaEffect {
        setOptions: (options: Partial<VantaCellsOptions>) => void;
        resize: () => void;
        destroy: () => void;
    }

    export default function CELLS(options: VantaCellsOptions): VantaEffect;
}

declare module 'vanta/dist/vanta.clouds.min' {
    interface VantaCloudsOptions {
        el: HTMLElement | null;
        THREE: any;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        backgroundColor?: number | string;
        skyColor?: number | string;
        cloudColor?: number | string;
        cloudShadowColor?: number | string;
        sunColor?: number | string;
        sunGlareColor?: number | string;
        sunlightColor?: number | string;
        speed?: number;
    }

    interface VantaEffect {
        setOptions: (options: Partial<VantaCloudsOptions>) => void;
        resize: () => void;
        destroy: () => void;
    }

    export default function CLOUDS(options: VantaCloudsOptions): VantaEffect;
} 