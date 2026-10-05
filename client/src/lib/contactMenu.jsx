import { createContext, useContext, useMemo, useState } from 'react';

// Open / closed state of the contact menu, so the nav, the Contact board and anything else
// can open it
const ContactMenuContext = createContext({ open: false, setOpen: () => {} });

export function ContactMenuProvider({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <ContactMenuContext.Provider value={value}>{children}</ContactMenuContext.Provider>;
}

export const useContactMenu = () => useContext(ContactMenuContext);
