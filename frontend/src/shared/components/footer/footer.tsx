import { styled } from '@styled-system/jsx'
import { container } from '@styled-system/patterns'
import { Box } from '../box'

export function Footer() {
  return (
    <styled.footer
      py={8}
      bg={'bg.secondary'}
      borderTop={'primary'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box className={container()}>{'foooter'}</Box>
    </styled.footer>
  )
}
