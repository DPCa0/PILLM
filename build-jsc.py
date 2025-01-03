import os
import subprocess
import sys

def main():
    os.environ["CC"] = "/usr/bin/clang"
    os.environ["CXX"] = "/usr/bin/clang++"

    existing_cxxflags = os.environ.get("CXXFLAGS", "")
    forced_cxxflags = existing_cxxflags + " -std=c++20"
    os.environ["CXXFLAGS"] = forced_cxxflags.strip()

    path_entries = os.environ["PATH"].split(":")
    filtered_paths = [p for p in path_entries if "/usr/share/swift/usr/bin" not in p]
    os.environ["PATH"] = ":".join(filtered_paths)

    build_command = [
        "Tools/Scripts/build-webkit",
        "--jsc-only",
        "--cmakeargs=-DCMAKE_C_COMPILER=/usr/bin/clang "
                      "-DCMAKE_CXX_COMPILER=/usr/bin/clang++ "
                      "-DCMAKE_CXX_STANDARD=20"
    ]

    result = subprocess.run(build_command)
    sys.exit(result.returncode)

if __name__ == "__main__":
    main()
