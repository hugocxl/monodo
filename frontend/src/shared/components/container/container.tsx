import {
  Container as SxContainer,
  type ContainerProps
} from '@styled-system/jsx'

function Container(props: ContainerProps) {
  return (
    <SxContainer
      w={'100%'}
      overflow={'hidden'}
      maxWidth={'1400px'}
      {...props}
    />
  )
}

export { Container, type ContainerProps }
