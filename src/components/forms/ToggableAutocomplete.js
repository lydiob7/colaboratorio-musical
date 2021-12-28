import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    },
    field: (props) => ({
        marginBottom: '16px',
        paddingLeft: '16px',
        border: props.value ? 'none' : `1px solid ${theme.palette.error.main}`
    }),
    flexBetween: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: '.92rem',
        fontWeight: 500,
        marginBottom: '4px'
    },
    listItem: {
        margin: '.5rem 0'
    },
    requiredSymbol: {
        color: theme.palette.error.main
    }
}));

const ToggableSelect = ({
    addOption = () => {},
    label,
    multiple = true,
    options = [],
    onSubmit = () => {},
    placeholder = '',
    required = false,
    requiredLength = 1,
    style,
    type,
    value = []
}) => {
    const [edit, setEdit] = useState(false);
    const [editedValues, setEditedValues] = useState(value);
    const [skillsToAdd, setSkillsToAdd] = useState([]);

    const classes = useStyles({
        value: (required && !value) || (required && value.length < requiredLength) ? false : true
    });

    const handleChange = (_, values) => {
        const parsedValues = [];
        values.forEach((val) => {
            if (typeof val === 'string') {
                setSkillsToAdd([...skillsToAdd, { title: val }]);
                return parsedValues.push({ title: val });
            }

            parsedValues.push(val);
        });
        setEditedValues(parsedValues);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        skillsToAdd.forEach((skill) => {
            if (skill) addOption(skill);
        });
        onSubmit(editedValues);
        setEdit(false);
    };

    const contentItem = (item, index) => {
        if (item === '') return null;
        if (type === 'location')
            return (
                <div onClick={() => setEdit(true)} style={{ display: 'flex', alignItems: 'center' }} key={item + index}>
                    <Typography>{item?.title}</Typography>
                    <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                        location_on
                    </Icon>
                </div>
            );
        if (type === 'chip')
            return (
                <Chip
                    onClick={() => setEdit(true)}
                    style={{ margin: '8px' }}
                    key={item + index}
                    label={item?.title}
                    color="primary"
                    variant="outlined"
                />
            );
        return (
            <li onClick={() => setEdit(true)} className={classes.listItem} key={item + index}>
                {item?.title}
            </li>
        );
    };

    return (
        <div style={style} className={classes.field}>
            <form onSubmit={handleSubmit}>
                <div className={classes.flexBetween}>
                    <Typography className={classes.label}>
                        {label} {required && <span className={classes.requiredSymbol}>*</span>}
                    </Typography>

                    <div>
                        {edit && (
                            <IconButton type="submit">
                                <SaveAltIcon style={{ fontSize: '1rem', margin: '0 4px' }} color="action" />
                            </IconButton>
                        )}
                        <IconButton onClick={() => setEdit(!edit)}>
                            <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                                {edit ? 'close' : 'edit'}
                            </Icon>
                        </IconButton>
                    </div>
                </div>
                {edit ? (
                    <Autocomplete
                        autoSelect
                        limitTags={3}
                        multiple={multiple}
                        onChange={handleChange}
                        options={options}
                        freeSolo
                        getOptionLabel={(option) => option?.title}
                        getOptionSelected={(option, value) => option.title === value.title}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option?.title} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => <TextField {...params} variant="standard" placeholder={placeholder} />}
                        value={editedValues}
                    />
                ) : Array.isArray(editedValues) ? (
                    editedValues.map(contentItem)
                ) : (
                    <Typography variant="body1">{editedValues}</Typography>
                )}
            </form>
        </div>
    );
};

export default ToggableSelect;