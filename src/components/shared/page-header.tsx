import { cn } from '@/lib/utils'
import { Separator } from '../ui'

type PageHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  separate?: boolean
}

function PageHeader({ className, children, separate, ...props }: PageHeaderProps) {
  return (
    <>
      <section
        className={cn(
          'flex flex-col items-start gap-2 pb-6 pt-5 md:pb-8 md:pt-8 lg:pb-10 lg:pt-8 w-full',
          separate && 'mb-2',
          className
        )}
        {...props}
      >
        {children}
      </section>
      {separate && <Separator className="absolute left-0 right-0 -mt-6" />}
    </>
  )
}

function PageHeaderHeading({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:leading-[1.1]',
        className
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('max-w-2xl text-lg font-light text-muted-foreground', className)}
      {...props}
    />
  )
}

function PageHeaderActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex w-full items-center justify-start gap-2 py-2', className)}
      {...props}
    />
  )
}

export { PageHeaderActions, PageHeader, PageHeaderDescription, PageHeaderHeading }