import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import doFetch from '../../utils/doFetch';
import { styled } from '@mui/system';
import { useNavigate } from '../../utils/useNavigate';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: 'rgb(25, 118, 210)',
  backgroundColor: "white",
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontWeight: 500,
  fontSize: '0.875rem',
  lineHeight: 1.57,
  letterSpacing: '0.00714em'
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function TopSearch({ renderInput }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState();
  const navigate = useNavigate();

  const fetch = React.useMemo(
    () =>
      debounce((inputText, callback) => {
        const url = `/search?name=${inputText}`
        doFetch(url, { method: 'POST', body: { name: inputText } }).then((data = {}) => callback(data));
      }, 1000),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!inputValue?.length || inputValue === value) {
      setOptions([]);
      return undefined;
    }

    fetch(inputValue, (results) => {
      if (active) {
        let newOptions = [];
        if (results && results.length) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch, value]);

  const onUserSelect = (event, newValue) => {
    setValue(newValue);
    // do navagation here
    if(newValue && newValue.type) {
      if(newValue.type === 'Organization') {
        navigate(`organizationdetails?org=${newValue?.id}`)
      } else if(newValue.type === 'Participant') {
        navigate(`participantdetails?participant=${newValue?.id}`)
      }
    }
  }

  const renderGroup = (params) => (
    <li key={params.key}>
      <GroupHeader>
        {params.group}
      </GroupHeader>
      <GroupItems>
        {params.children}
      </GroupItems>
    </li>
  )

  return (
    <Autocomplete
      id="top-search"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(x) => x}
      options={options}
      value={value}
      onChange={onUserSelect}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={renderInput}
      renderGroup={renderGroup}
      groupBy={(option) => option.type}
      open={options.length > 0 ? open : false}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    />
  );
}
