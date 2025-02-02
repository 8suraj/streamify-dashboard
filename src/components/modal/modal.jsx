import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ModalWrapper({ open, onClose, children }) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-40' initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='modal-overlay-common' />
        </Transition.Child>

        <div className='modalcommon'>
          <div className='modalcommon-container'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4'
              enterTo='opacity-100 translate-y-0 '
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 '
              leaveTo='opacity-0 translate-y-4'>
              <Dialog.Panel className='modal-dialog-panel'>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
