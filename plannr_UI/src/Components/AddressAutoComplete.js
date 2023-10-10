import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function AddressAutocomplete() {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (!window.google) {
            console.error("Google Maps JavaScript API is not loaded");
            return;
        }
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);

        if (!inputValue) return setOptions([]);

        const autocompleteService = new window.google.maps.places.AutocompleteService();

        autocompleteService.getPlacePredictions({
            input: inputValue,
            location: new window.google.maps.LatLng(-37.8136, 144.9631),
            radius: 50000,
            strictBounds: true
        }, (predictions, status) => {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }

            setOptions(predictions.map(prediction => prediction.description));
        });
    };

    return (
        <div className='bg-white'>
            <TextField 
                fullWidth
                label="Address"
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter an address..."
            />
            <List>
                {options.map((address, index) => (
                    <ListItem button key={index} onClick={() => setInputValue(address)}>
                        <ListItemText primary={address} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default AddressAutocomplete;
