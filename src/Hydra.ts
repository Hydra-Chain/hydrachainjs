import { HydraRPC } from "./HydraRPC"
import { IContractsRepoData, ContractsRepo } from "./ContractsRepo"
import { Contract } from "./Contract"

/**
 * The `Hydra` class is an instance of the `hydrajs` API.
 *
 * @param providerURL URL of the hydrad RPC service.
 * @param repoData Information about Solidity contracts.
 */
export class Hydra extends HydraRPC {
  private repo: ContractsRepo

  constructor(providerURL: string, repoData?: IContractsRepoData) {
    super(providerURL)
    this.repo = new ContractsRepo(this, {
      // massage the repoData by providing empty default properties
      contracts: {},
      libraries: {},
      related: {},
      ...repoData,
    })
  }

  /**
   * A factory method to instantiate a `Contract` instance using the ABI
   * definitions and address found in `repoData`. The Contract instance is
   * configured with an event log decoder that can decode all known event types
   * found in `repoData`.
   *
   * @param name The name of a deployed contract
   */
  public contract(name: string): Contract {
    return this.repo.contract(name)
  }
}
