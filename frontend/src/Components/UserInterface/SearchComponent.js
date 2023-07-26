import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slice/filterSlice';
const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(9),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    inputRoot: {
        color: '#000000 !important',
        backgroundColor: "#4dabf570",
        borderRadius: "5px",
        width: '100%',
        height: "3em"
    },
    inputInput: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(10),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});
const SearchComponent = (props) => {
    // const [search, savesearch] = useState() 
    const dispatch = useDispatch()
    const debounse = (e) => {
        let timer
        clearTimeout(timer)
        timer = setTimeout(() => {
            dispatch(setSearch(e))
        }, 500);
    }
    const { classes } = props;
    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <Search sx={{ color: "black " }} />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onChange={(e) => debounse(e.target.value)}
                />
            </div>
        </>
    )
}

export default withStyles(styles)(SearchComponent)