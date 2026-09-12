{
  description = "Dev shell for recipes-website (Angular 9 + node-sass, needs Node 14)";

  # node-sass 4.14.x only ships prebuilt native binaries through Node 14 (see AGENTS.md),
  # so nixpkgs is pinned to the last release whose nodejs-14_x still has that binding.
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";

  outputs = { self, nixpkgs }:
    let
      forAllSystems = nixpkgs.lib.genAttrs [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = [ pkgs.nodejs-14_x ];
          };
        });
    };
}
