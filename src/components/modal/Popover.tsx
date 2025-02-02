import * as React from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingArrow,
  Placement,
} from '@floating-ui/react';

interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement; // Modify placement prop type to include 'left'
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shouldClose?: boolean;
}

export function usePopover({
  initialOpen = false,
  placement = 'left',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  shouldClose = false,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  // Close popover if shouldClose is true
  React.useEffect(() => {
    if (shouldClose) {
      setOpen(false);
    }
  }, [shouldClose, setOpen]);

  // Correctly typed ref for SVG element
  const arrowRef = React.useRef<SVGSVGElement | null>(null);

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10), // Adjust the offset as needed
      flip({
        crossAxis: false, // Disable crossAxis for left alignment
        padding: 5,
      }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef, padding: 5 }),
    ],
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  React.useEffect(() => {
    function handleClickOutside(event: Event) {
      // For mousedown, we check if the click happened outside the popover
      // For scroll, we simply close the popover
      if (
        event.type === 'mousedown' &&
        !context.refs.floating.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      } else if (event.type === 'scroll') {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleClickOutside); // Listen for scroll events
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleClickOutside); // Clean up scroll listener
    };
  }, [open, context.refs.floating, setOpen]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      arrowRef,
    }),
    [open, setOpen, interactions, data, modal, arrowRef]
  );
}

type ContextType = ReturnType<typeof usePopover> | null;

const PopoverContext = React.createContext<ContextType>(null);

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
};

export function Popover({
  children,
  modal = false,
  shouldClose = false,
  placement = 'bottom', // Set default placement to 'left'
  ...restOptions
}: {
  children: React.ReactNode;
} & PopoverOptions) {
  const popover = usePopover({ modal, shouldClose, placement, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & PopoverTriggerProps
>(function PopoverTrigger({ children, asChild = false, ...props }, propRef) {
  const context = usePopoverContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && React.isValidElement(children)) {
    const clonedElement = React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      })
    );
    return clonedElement;
  }

  return (
    <button
      ref={ref}
      type='button'
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}>
      {children}
    </button>
  );
});

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function PopoverContent({ style, ...props }, propRef) {
  const {
    context: floatingContext,
    arrowRef,
    ...context
  } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} modal={context.modal}>
        <div
          ref={ref}
          style={{ ...context.floatingStyles, ...style, zIndex: 100 }}
          {...context.getFloatingProps(props)}>
          {props.children}
          <FloatingArrow
            ref={arrowRef}
            context={floatingContext}
            width={12}
            height={6}
            style={{
              fill: '#272626',
              // transform: 'translateX(-100%)',
            }}
          />
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

export const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function PopoverClose(props, ref) {
  const { setOpen } = usePopoverContext();
  return (
    <button
      type='button'
      ref={ref}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        setOpen(false);
      }}
    />
  );
});
