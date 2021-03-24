(function() {var implementors = {};
implementors["bitvec"] = [{"text":"impl&lt;O, V, Rhs&gt; BitOr&lt;Rhs&gt; for BitArray&lt;O, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;O: BitOrder,<br>&nbsp;&nbsp;&nbsp;&nbsp;V: BitView,<br>&nbsp;&nbsp;&nbsp;&nbsp;BitSlice&lt;O, V::Store&gt;: BitOrAssign&lt;Rhs&gt;,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;R&gt; BitOr&lt;R&gt; for BitMask&lt;R&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;R: BitRegister,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;O, T, Rhs&gt; BitOr&lt;Rhs&gt; for BitBox&lt;O, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;O: BitOrder,<br>&nbsp;&nbsp;&nbsp;&nbsp;T: BitStore,<br>&nbsp;&nbsp;&nbsp;&nbsp;BitSlice&lt;O, T&gt;: BitOrAssign&lt;Rhs&gt;,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;O, T, Rhs&gt; BitOr&lt;Rhs&gt; for BitVec&lt;O, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;O: BitOrder,<br>&nbsp;&nbsp;&nbsp;&nbsp;T: BitStore,<br>&nbsp;&nbsp;&nbsp;&nbsp;BitSlice&lt;O, T&gt;: BitOrAssign&lt;Rhs&gt;,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["fake_simd"] = [{"text":"impl BitOr&lt;u32x4&gt; for u32x4","synthetic":false,"types":[]}];
implementors["frame_support"] = [{"text":"impl BitOr&lt;WithdrawReasons&gt; for WithdrawReasons","synthetic":false,"types":[]}];
implementors["hashbrown"] = [{"text":"impl&lt;T, S&gt; BitOr&lt;&amp;'_ HashSet&lt;T, S&gt;&gt; for &amp;HashSet&lt;T, S&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Eq + Hash + Clone,<br>&nbsp;&nbsp;&nbsp;&nbsp;S: BuildHasher + Default,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["num_bigint"] = [{"text":"impl BitOr&lt;BigInt&gt; for BigInt","synthetic":false,"types":[]},{"text":"impl&lt;'a&gt; BitOr&lt;BigInt&gt; for &amp;'a BigInt","synthetic":false,"types":[]},{"text":"impl&lt;'a, 'b&gt; BitOr&lt;&amp;'b BigInt&gt; for &amp;'a BigInt","synthetic":false,"types":[]},{"text":"impl&lt;'a&gt; BitOr&lt;&amp;'a BigInt&gt; for BigInt","synthetic":false,"types":[]},{"text":"impl BitOr&lt;BigUint&gt; for BigUint","synthetic":false,"types":[]},{"text":"impl&lt;'a&gt; BitOr&lt;BigUint&gt; for &amp;'a BigUint","synthetic":false,"types":[]},{"text":"impl&lt;'a, 'b&gt; BitOr&lt;&amp;'b BigUint&gt; for &amp;'a BigUint","synthetic":false,"types":[]},{"text":"impl&lt;'a&gt; BitOr&lt;&amp;'a BigUint&gt; for BigUint","synthetic":false,"types":[]}];
implementors["primitive_types"] = [{"text":"impl BitOr&lt;U128&gt; for U128","synthetic":false,"types":[]},{"text":"impl BitOr&lt;U256&gt; for U256","synthetic":false,"types":[]},{"text":"impl BitOr&lt;U512&gt; for U512","synthetic":false,"types":[]},{"text":"impl&lt;'l, 'r&gt; BitOr&lt;&amp;'r H128&gt; for &amp;'l H128","synthetic":false,"types":[]},{"text":"impl BitOr&lt;H128&gt; for H128","synthetic":false,"types":[]},{"text":"impl&lt;'l, 'r&gt; BitOr&lt;&amp;'r H160&gt; for &amp;'l H160","synthetic":false,"types":[]},{"text":"impl BitOr&lt;H160&gt; for H160","synthetic":false,"types":[]},{"text":"impl&lt;'l, 'r&gt; BitOr&lt;&amp;'r H256&gt; for &amp;'l H256","synthetic":false,"types":[]},{"text":"impl BitOr&lt;H256&gt; for H256","synthetic":false,"types":[]},{"text":"impl&lt;'l, 'r&gt; BitOr&lt;&amp;'r H512&gt; for &amp;'l H512","synthetic":false,"types":[]},{"text":"impl BitOr&lt;H512&gt; for H512","synthetic":false,"types":[]}];
implementors["subtle"] = [{"text":"impl BitOr&lt;Choice&gt; for Choice","synthetic":false,"types":[]}];
implementors["typenum"] = [{"text":"impl BitOr&lt;B0&gt; for B0","synthetic":false,"types":[]},{"text":"impl BitOr&lt;B1&gt; for B0","synthetic":false,"types":[]},{"text":"impl&lt;Rhs:&nbsp;Bit&gt; BitOr&lt;Rhs&gt; for B1","synthetic":false,"types":[]},{"text":"impl&lt;U:&nbsp;Unsigned&gt; BitOr&lt;U&gt; for UTerm","synthetic":false,"types":[]},{"text":"impl&lt;B:&nbsp;Bit, U:&nbsp;Unsigned&gt; BitOr&lt;UTerm&gt; for UInt&lt;U, B&gt;","synthetic":false,"types":[]},{"text":"impl&lt;Ul:&nbsp;Unsigned, Ur:&nbsp;Unsigned&gt; BitOr&lt;UInt&lt;Ur, B0&gt;&gt; for UInt&lt;Ul, B0&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Ul: BitOr&lt;Ur&gt;,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;Ul:&nbsp;Unsigned, Ur:&nbsp;Unsigned&gt; BitOr&lt;UInt&lt;Ur, B1&gt;&gt; for UInt&lt;Ul, B0&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Ul: BitOr&lt;Ur&gt;,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;Ul:&nbsp;Unsigned, Ur:&nbsp;Unsigned&gt; BitOr&lt;UInt&lt;Ur, B0&gt;&gt; for UInt&lt;Ul, B1&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Ul: BitOr&lt;Ur&gt;,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;Ul:&nbsp;Unsigned, Ur:&nbsp;Unsigned&gt; BitOr&lt;UInt&lt;Ur, B1&gt;&gt; for UInt&lt;Ul, B1&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Ul: BitOr&lt;Ur&gt;,&nbsp;</span>","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()