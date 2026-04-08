import { phase1 } from "./phase1";
import { phase7 } from "./phase7";
import { phase9Prism } from "./phase9Prism";
import { phase9Town } from "./phase9Town";

// DHA Phase overlay configuration matching React Native implementation
export const DHA_OVERLAY_CONFIG = {
    "DHA phase 1": {
        overlays: [
            {
                id: "p1",
                image: "/images/DHA/p1.png",
                bounds: [
                    [31.4684, 74.3771],
                    [31.4907, 74.4075],
                ],
                zIndex: 3,
            },
        ],
    },
    "DHA phase 2": {
        overlays: [
            {
                id: "p2",
                image: "/images/DHA/p2half.jpg",
                bounds: [
                    [31.46842, 74.38909],
                    [31.48551, 74.41385],
                ],
                zIndex: 3,
            },
        ],
    },
    "DHA phase 3": {
        overlays: [
            {
                id: "p3",
                image: "/images/DHA/p3.png",
                bounds: [
                    [31.457965, 74.355068],
                    [31.484842, 74.394532],
                ],
                zIndex: 3,
            },
        ],
    },
    "DHA phase 4": {
        overlays: [
            {
                id: "p4",
                image: "/images/DHA/p4.png",
                bounds: [
                    [31.446965, 74.359568],
                    [31.473842, 74.397653],
                ],
                zIndex: 3,
            },
        ],
    },
    "DHA phase 5": {
        overlays: [
            {
                id: "p5-base",
                image: "/images/DHA/p55.png",
                bounds: [
                    [31.452965, 74.391998],
                    [31.476942, 74.423793],
                ],
                zIndex: 3,
            },
            {
                id: "p5-phase",
                image: "/images/DHA/p56.png",
                bounds: [
                    [31.459501, 74.423689],
                    [31.476942, 74.432003],
                ],
                zIndex: 9,
            },
        ],
    },
    "DHA phase 6": {
        overlays: [
            {
                id: "p6-base",
                image: "/images/DHA/p62.png",
                bounds: [
                    [31.45633, 74.42898],
                    [31.50663, 74.49858],
                ],
                zIndex: 3,
            },
            {
                id: "p6-phase",
                image: "/images/DHA/p63.png",
                bounds: [
                    [31.45263, 74.44018],
                    [31.46433, 74.46328],
                ],
                zIndex: 9,
            },
        ],
    },
    "DHA phase 7": {
        overlays: [
            { id: "p7-b1", image: "/images/DHA/p7/p7pn.png", bounds: [[31.485975, 74.469382], [31.499905, 74.483486]], zIndex: 1 },
            { id: "p7-b2", image: "/images/DHA/p7/p7rm.png", bounds: [[31.477407, 74.468762], [31.486475, 74.478755]], zIndex: 2 },
            { id: "p7-base", image: "/images/DHA/p7/p7ts.png", bounds: [[31.473069, 74.478047], [31.486001, 74.493295]], zIndex: 3 },
            { id: "p7-b4", image: "/images/DHA/p7/p7qt.png", bounds: [[31.484354, 74.483454], [31.493061, 74.500799]], zIndex: 4 },
            { id: "p7-b5", image: "/images/DHA/p7/p7t.png", bounds: [[31.476411, 74.491517], [31.483199, 74.504223]], zIndex: 5 },
            { id: "p7-b6", image: "/images/DHA/p7/p7u.png", bounds: [[31.467967, 74.48554], [31.478282, 74.50368]], zIndex: 7 },
            { id: "p7-b7", image: "/images/DHA/p7/p7x.png", bounds: [[31.457051, 74.484428], [31.468887, 74.502583]], zIndex: 8 },
            { id: "p7-phase", image: "/images/DHA/p7/p7y.png", bounds: [[31.44282, 74.482694], [31.460095, 74.502337]], zIndex: 9 },
            { id: "p7-b8", image: "/images/DHA/p7/p7z2.png", bounds: [[31.436845, 74.470105], [31.447375, 74.488991]], zIndex: 10 },
        ],
    },
    "DHA phase 9 town": {
        overlays: [
            {
                id: "p9t",
                image: "/images/DHA/p9t.png",
                bounds: [
                    [31.430000, 74.420000],
                    [31.450000, 74.460000],
                ],
                zIndex: 3,
            },
        ],
    },
};

// Search data structure matching React Native implementation
export const PAKISTAN_DATA = {
    data: [
        {
            city: "Lahore",
            city_area: [
                {
                    phase: "DHA phase 9 town",
                    phase_area: phase9Town.phase_area,
                    coordinates:phase9Town.coordinates,
                },
                {
                    phase: "DHA phase 9 prism",
                    phase_area: phase9Prism.phase_area,
                    coordinates:phase9Prism.coordinates,
                },
                { phase: "DHA Phase 1", phase_area: phase1.phase_area, coordinates: phase1.coordinates },
                { phase: "DHA phase 2", phase_area: [{ sector: "Sector Q", Plots: [1, 2, 3, 4] }], coordinates: null },
                { phase: "DHA phase 3", phase_area: [{ sector: "Sector W", Plots: [1, 2, 3, 4] }], coordinates: null },
                { phase: "DHA phase 4", phase_area: [{ sector: "Sector AA", Plots: [1, 2, 3, 4] }], coordinates: null },
                { phase: "DHA phase 5", phase_area: [{ sector: "Sector A", Plots: [1, 2, 3, 4] }], coordinates: null },
                { phase: "DHA phase 6", phase_area: [{ sector: "Sector A", Plots: [1, 2, 3, 4] }], coordinates: null },
                {
                    phase: "DHA phase 7",
                    phase_area: phase7.phase_area,
                    coordinates: phase7.coordinates,
                },
            ],
        },
    ],
};

// Default map configuration matching React Native
export const DEFAULT_CENTER = { lat: 31.5204, lng: 74.3587 };
export const MIN_ZOOM = 9;
export const MAX_ZOOM = 16.7;
