import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"

import CustomCard from "@components/CustomCard"
import { GroupData } from "@src/types/shared/group"

interface GroupDetailsProps {
  key: string
  data: GroupData
}

function GroupDetails({ data }: GroupDetailsProps) {
  function renderMembersNames() {
    if (!data.members || data.members.length == 0) {
      return false
    }
    return (
      <>
        {data.members.map(member => (
          <Typography key={member}>{member}</Typography>
        ))}
      </>
    )
  }

  const content = (
    <>
      <Typography>Admin: {data.admin}</Typography>
      <Tooltip placement="bottom-start" title={renderMembersNames()}>
        <Typography>Members: {data.countOfMembers}</Typography>
      </Tooltip>
    </>
  )

  return <CustomCard header={data.name} content={content} />
}

export default GroupDetails
