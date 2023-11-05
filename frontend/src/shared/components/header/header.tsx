import { Box, styled } from '@styled-system/jsx'
import { container } from '@styled-system/patterns'

export function Header() {
  return (
    <styled.header
      top={0}
      zIndex={1}
      backdropFilter={'blur(12px)'}
      position={'sticky'}
      borderBottom={'primary'}
      w={'full'}
    >
      <Box
        py={4}
        className={container()}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <styled.span textStyle={'xl'} fontWeight={'bold'}>
          {'🌐🚀 koi18n'}
        </styled.span>
      </Box>
    </styled.header>
  )
}
