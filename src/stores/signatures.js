import { writable } from 'svelte/store';

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/u/1/d/1REbHcqfs_1zgF-kGlXD6Zi08Vq8QGx9yo8ZAnH13l8U/export?format=csv&id=1REbHcqfs_1zgF-kGlXD6Zi08Vq8QGx9yo8ZAnH13l8U&gid=0';

function createSignatureStore() {
    const { subscribe, set } = writable({
        count: 255, // Default fallback value from copy.json
        lastUpdated: null,
        loading: false,
        error: null
    });

    async function fetchSignatures() {
        const now = Date.now();
        
        // Check if we have cached data that's still fresh
        const cached = getCachedData();
        if (cached && (now - cached.timestamp) < CACHE_DURATION) {
            set({
                count: cached.count,
                lastUpdated: cached.timestamp,
                loading: false,
                error: null
            });
            return;
        }

        set(prev => ({ ...prev, loading: true, error: null }));

        try {
            const response = await fetch(SPREADSHEET_URL);
            
            if (!response.ok) {
                throw new Error('Failed to fetch signature data');
            }

            const csvData = await response.text();
            
            // Parse CSV to get the value from cell B1
            // The CSV format will be: A1,B1,C1,etc.
            // We need the second value (B1) from the first row
            const lines = csvData.trim().split('\n');
            if (lines.length > 0) {
                const firstRow = lines[0].split(',');
                if (firstRow.length >= 2) {
                    const signatureCount = parseInt(firstRow[1].replace(/"/g, ''), 10);
                    
                    if (!isNaN(signatureCount)) {
                        // Cache the result
                        setCachedData(signatureCount, now);
                        
                        set({
                            count: signatureCount,
                            lastUpdated: now,
                            loading: false,
                            error: null
                        });
                        return;
                    }
                }
            }
            
            throw new Error('Invalid signature data format');
            
        } catch (error) {
            console.error('Error fetching signatures:', error);
            
            // Try to use cached data as fallback
            const cached = getCachedData();
            if (cached) {
                set({
                    count: cached.count,
                    lastUpdated: cached.timestamp,
                    loading: false,
                    error: 'Using cached data due to fetch error'
                });
            } else {
                // Use default fallback
                set({
                    count: 255,
                    lastUpdated: null,
                    loading: false,
                    error: error.message
                });
            }
        }
    }

    function getCachedData() {
        try {
            if (typeof localStorage !== 'undefined') {
                const cached = localStorage.getItem('eurovision_signatures');
                return cached ? JSON.parse(cached) : null;
            }
        } catch (e) {
            console.error('Error reading cached signature data:', e);
        }
        return null;
    }

    function setCachedData(count, timestamp) {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('eurovision_signatures', JSON.stringify({
                    count,
                    timestamp
                }));
            }
        } catch (e) {
            console.error('Error caching signature data:', e);
        }
    }

    // Auto-fetch on initialization
    if (typeof window !== 'undefined') {
        fetchSignatures();
        
        // Set up periodic refresh every 10 minutes
        setInterval(fetchSignatures, CACHE_DURATION);
    }

    return {
        subscribe,
        refresh: fetchSignatures
    };
}

export const signatures = createSignatureStore();
