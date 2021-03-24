(function() {var implementors = {};
implementors["futures_channel"] = [{"text":"impl&lt;T&gt; Future for Cancellation&lt;'_, T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; Future for Receiver&lt;T&gt;","synthetic":false,"types":[]}];
implementors["futures_task"] = [{"text":"impl&lt;T&gt; Future for LocalFutureObj&lt;'_, T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; Future for FutureObj&lt;'_, T&gt;","synthetic":false,"types":[]}];
implementors["tracing"] = [{"text":"impl&lt;T:&nbsp;Future&gt; Future for Instrumented&lt;T&gt;","synthetic":false,"types":[]}];
implementors["wasm_timer"] = [{"text":"impl&lt;F&gt; Future for Timeout&lt;F&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;F: TryFuture,<br>&nbsp;&nbsp;&nbsp;&nbsp;F::Error: From&lt;Error&gt;,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl Future for Delay","synthetic":false,"types":[]},{"text":"impl Future for Timer","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()