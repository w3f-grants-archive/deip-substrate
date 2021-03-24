(function() {var implementors = {};
implementors["bip39"] = [{"text":"impl UpperHex for Mnemonic","synthetic":false,"types":[]},{"text":"impl UpperHex for Seed","synthetic":false,"types":[]}];
implementors["bitvec"] = [{"text":"impl&lt;O, V&gt; UpperHex for BitArray&lt;O, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;O: BitOrder,<br>&nbsp;&nbsp;&nbsp;&nbsp;V: BitView,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; UpperHex for Domain&lt;'_, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: BitStore,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;O, T&gt; UpperHex for BitSlice&lt;O, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;O: BitOrder,<br>&nbsp;&nbsp;&nbsp;&nbsp;T: BitStore,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;O, T&gt; UpperHex for BitBox&lt;O, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;O: BitOrder,<br>&nbsp;&nbsp;&nbsp;&nbsp;T: BitStore,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;O, T&gt; UpperHex for BitVec&lt;O, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;O: BitOrder,<br>&nbsp;&nbsp;&nbsp;&nbsp;T: BitStore,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["generic_array"] = [{"text":"impl&lt;T:&nbsp;ArrayLength&lt;u8&gt;&gt; UpperHex for GenericArray&lt;u8, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Add&lt;T&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;T as Add&lt;T&gt;&gt;::Output: ArrayLength&lt;u8&gt;,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["nalgebra"] = [{"text":"impl&lt;N, R:&nbsp;Dim, C:&nbsp;Dim, S&gt; UpperHex for Matrix&lt;N, R, C, S&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;N: Scalar + UpperHex,<br>&nbsp;&nbsp;&nbsp;&nbsp;S: Storage&lt;N, R, C&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;DefaultAllocator: Allocator&lt;usize, R, C&gt;,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["num_bigint"] = [{"text":"impl UpperHex for BigInt","synthetic":false,"types":[]},{"text":"impl UpperHex for BigUint","synthetic":false,"types":[]}];
implementors["num_complex"] = [{"text":"impl&lt;T&gt; UpperHex for Complex&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: UpperHex + Num + PartialOrd + Clone,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["primitive_types"] = [{"text":"impl UpperHex for H128","synthetic":false,"types":[]},{"text":"impl UpperHex for H160","synthetic":false,"types":[]},{"text":"impl UpperHex for H256","synthetic":false,"types":[]},{"text":"impl UpperHex for H512","synthetic":false,"types":[]}];
implementors["tinyvec"] = [{"text":"impl&lt;A:&nbsp;Array&gt; UpperHex for ArrayVec&lt;A&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;A::Item: UpperHex,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;'s, T&gt; UpperHex for SliceVec&lt;'s, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: UpperHex,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;A:&nbsp;Array&gt; UpperHex for TinyVec&lt;A&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;A::Item: UpperHex,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["wyz"] = [{"text":"impl&lt;T:&nbsp;Binary + UpperHex&gt; UpperHex for FmtBinary&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Display + UpperHex&gt; UpperHex for FmtDisplay&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;LowerExp + UpperHex&gt; UpperHex for FmtLowerExp&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;LowerHex + UpperHex&gt; UpperHex for FmtLowerHex&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Octal + UpperHex&gt; UpperHex for FmtOctal&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Pointer + UpperHex&gt; UpperHex for FmtPointer&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;UpperExp + UpperHex&gt; UpperHex for FmtUpperExp&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;UpperHex&gt; UpperHex for FmtUpperHex&lt;T&gt;","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()