import React, {useState, useMemo} from 'react'
import {useFieldArray} from "react-hook-form"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

import FormSelect from '../../component/FormInputs/FormSelect'

export default function ServiceSelection({control, organizations}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services"
  });
  const orgOpts = useMemo(() => {
    return organizations.map(org => ({label: org.name, value: org.id, services: org.services.map(s => ({label: s.name, value: s.id}))}))
  }, [organizations])
  const defaultRow = useMemo(() => {
    return {organizationId: orgOpts[0].value, orgServiceId: null}
  }, [orgOpts])

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Button size="small" color="primary" onClick={() => append({...defaultRow})}>Add New Service</Button>
      </Box>
      <Grid alignItems="center" container spacing={2}>
        {
          fields.map((item, index) => {
            return (
              <ServiceRow key={item.id} id={item.id} control={control} index={index} remove={remove} orgOpts={orgOpts} item={item} />
            )
          })
        }
      </Grid>
    </div>
  )
}

function ServiceRow({ id, control, index, remove, orgOpts, item }) {
  const {services} = orgOpts.find(org => org.value === item.organizationId)
  const [serviceOpt, setServiceOpt] = useState(services)

  return [
    <Grid key={`${id}_org`} item xs={5}>
      <FormSelect label="Organization" control={control} name={`services.${index}.organizationId`} width={220} options={orgOpts}
        onChange={val => setServiceOpt(orgOpts.find(o => o.value === val).services)}
      />
    </Grid>,
    <Grid key={`${id}_ser`} item xs={5}><FormSelect label="Service" control={control} name={`services.${index}.orgServiceId`} width={220} options={serviceOpt || []} /></Grid>,
    <Grid key={`${id}_btn`} item xs={2}><Button size="small" color="primary" sx={{minWidth: '24px'}} onClick={() => remove(index)}><CloseIcon /></Button></Grid>,
  ]
}
  