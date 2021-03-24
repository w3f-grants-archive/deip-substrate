(function() {var implementors = {};
implementors["nalgebra"] = [{"text":"impl&lt;N, R:&nbsp;Dim, C:&nbsp;Dim, S&gt; RelativeEq&lt;Matrix&lt;N, R, C, S&gt;&gt; for Matrix&lt;N, R, C, S&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;N: Scalar + RelativeEq,<br>&nbsp;&nbsp;&nbsp;&nbsp;S: Storage&lt;N, R, C&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;N::Epsilon: Copy,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;N, R:&nbsp;Dim, C:&nbsp;Dim, S&gt; RelativeEq&lt;Unit&lt;Matrix&lt;N, R, C, S&gt;&gt;&gt; for Unit&lt;Matrix&lt;N, R, C, S&gt;&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;N: Scalar + RelativeEq,<br>&nbsp;&nbsp;&nbsp;&nbsp;S: Storage&lt;N, R, C&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;N::Epsilon: Copy,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;N:&nbsp;Scalar + RelativeEq, D:&nbsp;DimName&gt; RelativeEq&lt;Point&lt;N, D&gt;&gt; for Point&lt;N, D&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;DefaultAllocator: Allocator&lt;N, D&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;N::Epsilon: Copy,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;N, D:&nbsp;DimName&gt; RelativeEq&lt;Rotation&lt;N, D&gt;&gt; for Rotation&lt;N, D&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;N: Scalar + RelativeEq,<br>&nbsp;&nbsp;&nbsp;&nbsp;DefaultAllocator: Allocator&lt;N, D, D&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;N::Epsilon: Copy,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;N:&nbsp;RealField + RelativeEq&lt;Epsilon = N&gt;&gt; RelativeEq&lt;Quaternion&lt;N&gt;&gt; for Quaternion&lt;N&gt;","synthetic":false,"types":[]},{"text":"impl&lt;N:&nbsp;RealField + RelativeEq&lt;Epsilon = N&gt;&gt; RelativeEq&lt;Unit&lt;Quaternion&lt;N&gt;&gt;&gt; for UnitQuaternion&lt;N&gt;","synthetic":false,"types":[]},{"text":"impl&lt;N:&nbsp;RealField&gt; RelativeEq&lt;Unit&lt;Complex&lt;N&gt;&gt;&gt; for UnitComplex&lt;N&gt;","synthetic":false,"types":[]},{"text":"impl&lt;N:&nbsp;Scalar + RelativeEq, D:&nbsp;DimName&gt; RelativeEq&lt;Translation&lt;N, D&gt;&gt; for Translation&lt;N, D&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;DefaultAllocator: Allocator&lt;N, D&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;N::Epsilon: Copy,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;N:&nbsp;RealField, D:&nbsp;DimName, R&gt; RelativeEq&lt;Isometry&lt;N, D, R&gt;&gt; for Isometry&lt;N, D, R&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;R: AbstractRotation&lt;N, D&gt; + RelativeEq&lt;Epsilon = N::Epsilon&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;DefaultAllocator: Allocator&lt;N, D&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;N::Epsilon: Copy,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;N:&nbsp;RealField, D:&nbsp;DimName, R&gt; RelativeEq&lt;Similarity&lt;N, D, R&gt;&gt; for Similarity&lt;N, D, R&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;R: AbstractRotation&lt;N, D&gt; + RelativeEq&lt;Epsilon = N::Epsilon&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;DefaultAllocator: Allocator&lt;N, D&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;N::Epsilon: Copy,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;N:&nbsp;RealField, D:&nbsp;DimNameAdd&lt;U1&gt;, C:&nbsp;TCategory&gt; RelativeEq&lt;Transform&lt;N, D, C&gt;&gt; for Transform&lt;N, D, C&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;N::Epsilon: Copy,<br>&nbsp;&nbsp;&nbsp;&nbsp;DefaultAllocator: Allocator&lt;N, DimNameSum&lt;D, U1&gt;, DimNameSum&lt;D, U1&gt;&gt;,&nbsp;</span>","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()