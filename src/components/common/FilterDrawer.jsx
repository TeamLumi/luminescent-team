import React from 'react';
import {
  Box,
  Drawer,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { DoubleArrow } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

export const FilterDrawer = ({
    filterOpen,
    setFilterDrawerOpen,
    clearAllFilters,
    searchTable,
    handleChange,
    children,
}) => {
    return (
        <Drawer
            open={filterOpen}
            onClose={() => setFilterDrawerOpen(false)}
            anchor="right"
            sx={{ maxWidth: "50%" }}
        >
            <FilterHeader clearAllFilters={clearAllFilters} setFilterDrawerOpen={setFilterDrawerOpen} />
            <DisplayValueContainer searchTable={searchTable} handleChange={handleChange} />
            {children}
            <SaveFilterContainer setFilterDrawerOpen={setFilterDrawerOpen} />
        </Drawer>
    );
}

const DisplayValues = ({ data, handleChange, prefix = "" }) => {
    return (
    <>
        {Object.entries(data).map(([key, value]) => {
            const fullKey = prefix ? `${prefix}.${key}` : key;

            // Skip if value is null
            if (value?.value === null || fullKey === "name" || fullKey === "id") {
                return null;
            }

            // If value is an object but doesn't have a 'value' property, recurse into it
            if (value && typeof value === "object" && !("value" in value)) {
                // Check if the nested object has any non-null values
                const hasNestedValues = Object.values(value).some(
                    (nestedValue) => nestedValue?.value !== null
                );
                return hasNestedValues ? (
                    <React.Fragment key={fullKey}>
                        <DisplayValues
                            data={value}
                            prefix={fullKey}
                            handleChange={handleChange}
                        />
                    </React.Fragment>
                ) : null;
            }

            // Display key-value pair for objects with 'label' and 'value' props
            return (
                <Box key={fullKey} sx={{ margin: "8px 0" }}>
                    <Button onClick={() => handleChange(fullKey, {value: null, label: value.label})}>
                        <CloseIcon sx={{ marginRight: "8px" }} /> {value.label}
                    </Button>
                </Box>
            );
        })}
    </>
    );
};

const FilterHeader = ({ clearAllFilters, setFilterDrawerOpen }) => {
    return (
        <Box
            display="flex"
            backgroundColor="var(--ifm-background-color)"
            borderBottom="2px solid var(--ifm-table-border-color)"
            zIndex="2"
            padding="25px"
            position="sticky"
            top="0"
            sx={{ padding: "1rem", justifyContent: "space-between", alignItems: "center" }}
        >
            <Typography variant="h5">Filter Menu</Typography>
            <Button color='error' onClick={clearAllFilters}>Clear Filters</Button>
            <IconButton onClick={() => setFilterDrawerOpen(false)}><CloseIcon /></IconButton>
        </Box>
    );
}

const DisplayValueContainer = ({ searchTable, handleChange }) => {
    return (
            <Box
                role="presentation"
                sx={{
                    minWidth: "350px",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "fit-content"
                }}
            >
                <Box display="flex" flexWrap="wrap" maxWidth="350px">
                    <DisplayValues data={searchTable} handleChange={handleChange} />
                </Box>
            </Box>
    );
}

const SaveFilterContainer = ({ setFilterDrawerOpen }) => {
    return (
        <Box
            bottom="0"
            right="0"
            backgroundColor="var(--ifm-background-color)"
            borderTop="2px solid var(--ifm-table-border-color)"
            zIndex="2"
            padding="25px"
            position="sticky"
            justifyContent="end"
            display="flex"
            width="100%"
            marginTop="auto"
        >
            <Button
                width="50%"
                variant='contained'
                onClick={() => setFilterDrawerOpen(false)}
                endIcon={<DoubleArrow fontSize='large' />}
                color='success'
            >
                Save Changes
            </Button>
        </Box>
    )
}