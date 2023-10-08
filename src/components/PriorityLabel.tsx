import React from 'react'
import { PriorityEnum } from './types'
import Chip from '@mui/material/Chip';
import styled from "@emotion/styled";

type CustomColor = {
  customColor: string;
}
const MyChip = styled(Chip) <CustomColor>`
  background-color: ${props => props.customColor};
  min-width: 70px;
`

const getText = (value: PriorityEnum) => {
  if (value === PriorityEnum.URGENT) return "Urgent";
  if (value === PriorityEnum.REGULAR) return "Regular";
  if (value === PriorityEnum.TRIVIAL) return "Trivial";
  return "Unknown"
}
const getColor = (value: PriorityEnum) => {
  if (value == PriorityEnum.URGENT) return "#e83d6d";
  if (value == PriorityEnum.REGULAR) return "#f1a824";
  if (value == PriorityEnum.TRIVIAL) return "#2277e0";
  return "Unknown"
}
type Props = {
  type: PriorityEnum
}
export const PriorityLabel: React.FC<Props> = ({ type }) => {
  return (
    <MyChip
      label={getText(type)}
      customColor={getColor(type)}
      color='primary'
      variant="filled"
    />
  )
}
