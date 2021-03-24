(function() {var implementors = {};
implementors["aho_corasick"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["bip39"] = [{"text":"impl Error for ErrorKind","synthetic":false,"types":[]}];
implementors["bitvec"] = [{"text":"impl&lt;R&gt; Error for BitIdxError&lt;R&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;R: BitRegister,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; Error for AddressError&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: BitStore,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; Error for BitPtrError&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: BitStore,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; Error for BitSpanError&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: BitStore,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["byte_slice_cast"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["chrono"] = [{"text":"impl Error for ParseError","synthetic":false,"types":[]},{"text":"impl Error for RoundingError","synthetic":false,"types":[]}];
implementors["digest"] = [{"text":"impl Error for InvalidOutputSize","synthetic":false,"types":[]}];
implementors["either"] = [{"text":"impl&lt;L, R&gt; Error for Either&lt;L, R&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;L: Error,<br>&nbsp;&nbsp;&nbsp;&nbsp;R: Error,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["futures_channel"] = [{"text":"impl Error for SendError","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Any&gt; Error for TrySendError&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl Error for TryRecvError","synthetic":false,"types":[]},{"text":"impl Error for Canceled","synthetic":false,"types":[]}];
implementors["futures_executor"] = [{"text":"impl Error for EnterError","synthetic":false,"types":[]}];
implementors["futures_task"] = [{"text":"impl Error for SpawnError","synthetic":false,"types":[]}];
implementors["futures_util"] = [{"text":"impl Error for Aborted","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Any, Item&gt; Error for ReuniteError&lt;T, Item&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Any&gt; Error for ReuniteError&lt;T&gt;","synthetic":false,"types":[]}];
implementors["getrandom"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["hex"] = [{"text":"impl Error for FromHexError","synthetic":false,"types":[]}];
implementors["linregress"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["log"] = [{"text":"impl Error for SetLoggerError","synthetic":false,"types":[]},{"text":"impl Error for ParseLevelError","synthetic":false,"types":[]}];
implementors["num_bigint"] = [{"text":"impl Error for ParseBigIntError","synthetic":false,"types":[]}];
implementors["num_rational"] = [{"text":"impl Error for ParseRatioError","synthetic":false,"types":[]}];
implementors["parity_scale_codec"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["parity_wasm"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["proc_macro2"] = [{"text":"impl Error for LexError","synthetic":false,"types":[]}];
implementors["rand"] = [{"text":"impl Error for BernoulliError","synthetic":false,"types":[]},{"text":"impl Error for WeightedError","synthetic":false,"types":[]},{"text":"impl Error for ReadError","synthetic":false,"types":[]}];
implementors["rand_core"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["regex"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["regex_automata"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["regex_syntax"] = [{"text":"impl Error for Error","synthetic":false,"types":[]},{"text":"impl Error for Error","synthetic":false,"types":[]},{"text":"impl Error for Error","synthetic":false,"types":[]},{"text":"impl Error for CaseFoldError","synthetic":false,"types":[]},{"text":"impl Error for UnicodeWordError","synthetic":false,"types":[]}];
implementors["rustc_hex"] = [{"text":"impl Error for FromHexError","synthetic":false,"types":[]}];
implementors["secp256k1"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["serde"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["serde_json"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["signature"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["sp_api"] = [{"text":"impl Error for ApiError","synthetic":false,"types":[]}];
implementors["sp_core"] = [{"text":"impl Error for PublicError","synthetic":false,"types":[]}];
implementors["sp_inherents"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["sp_runtime"] = [{"text":"impl Error for TransactionValidityError","synthetic":false,"types":[]}];
implementors["sp_state_machine"] = [{"text":"impl Error for ExecutionError","synthetic":false,"types":[]}];
implementors["sp_trie"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["statrs"] = [{"text":"impl Error for StatsError","synthetic":false,"types":[]}];
implementors["syn"] = [{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["time"] = [{"text":"impl Error for OutOfRangeError","synthetic":false,"types":[]},{"text":"impl Error for ParseError","synthetic":false,"types":[]}];
implementors["toml"] = [{"text":"impl Error for DatetimeParseError","synthetic":false,"types":[]},{"text":"impl Error for Error","synthetic":false,"types":[]},{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["tracing_core"] = [{"text":"impl Error for SetGlobalDefaultError","synthetic":false,"types":[]},{"text":"impl Error for ParseLevelError","synthetic":false,"types":[]},{"text":"impl Error for ParseLevelFilterError","synthetic":false,"types":[]}];
implementors["tracing_subscriber"] = [{"text":"impl Error for ParseError","synthetic":false,"types":[]},{"text":"impl Error for BadName","synthetic":false,"types":[]},{"text":"impl Error for FromEnvError","synthetic":false,"types":[]},{"text":"impl Error for Error","synthetic":false,"types":[]},{"text":"impl Error for TryInitError","synthetic":false,"types":[]}];
implementors["trie_db"] = [{"text":"impl&lt;HO:&nbsp;Debug, CE:&nbsp;Error + 'static&gt; Error for Error&lt;HO, CE&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T, E&gt; Error for TrieError&lt;T, E&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Debug,<br>&nbsp;&nbsp;&nbsp;&nbsp;E: Error,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["uint"] = [{"text":"impl Error for FromStrRadixErr","synthetic":false,"types":[]},{"text":"impl Error for FromDecStrErr","synthetic":false,"types":[]},{"text":"impl Error for FromHexError","synthetic":false,"types":[]}];
implementors["wasmi"] = [{"text":"impl Error for Trap","synthetic":false,"types":[]},{"text":"impl Error for Error","synthetic":false,"types":[]}];
implementors["wasmi_validation"] = [{"text":"impl Error for Error","synthetic":false,"types":[]},{"text":"impl Error for Error","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()