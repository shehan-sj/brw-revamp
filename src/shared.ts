// Entry loaded (transitively) by every page. The stylesheet is linked directly
// in the document <head> (see the chrome plugin in vite.config.ts) so CSS is
// render-blocking and cached across pages — no flash of unstyled content. This
// module only pulls in shared interactivity.
import './chrome'
import './cinematic'
