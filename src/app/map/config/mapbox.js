// Mapbox Configuration
export const MAPBOX_CONFIG = {
    // Public token for client-side map rendering
    PUBLIC_TOKEN: 'pk.eyJ1IjoicmVhbGV4Y2hhbmdlIiwiYSI6ImNtaTFkcWh4cDB6OTYyb3Njc2lyZjJ0NXEifQ.WNTHaReEBy7dkigNgrGGAQ', // 'pk.eyJ1IjoiemlhaGFzc2FuIiwiYSI6ImNtNTR6bjk0ejE0ZXIybHNlbDIxYjRpanUifQ.cr1fg5yN9cei3OHaXZmM9Q',

    //pk.eyJ1IjoicmVhbGV4Y2hhbmdlIiwiYSI6ImNtaTFkcWh4cDB6OTYyb3Njc2lyZjJ0NXEifQ.WNTHaReEBy7dkigNgrGGAQ

    // Download token for server-side operations (if needed)
    DOWNLOAD_TOKEN: 'sk.eyJ1IjoiemlhaGFzc2FuIiwiYSI6ImNtM3IxZW03cDAwcWwyaXF3cmd5MWFvZGEifQ.827WTB-RYUlZVg1IqlB_Rw',

    // Default map style
    DEFAULT_STYLE: 'mapbox://styles/mapbox/streets-v12',

    // Map bounds for DHA Lahore area
    DEFAULT_BOUNDS: [
        [74.25, 31.35], // Southwest coordinates
        [74.55, 31.55]  // Northeast coordinates
    ]
};
